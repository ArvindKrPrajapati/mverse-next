import { getValidId } from "@/lib/serverCookies";
import NotificationToken from "@/models/notification-token";
import NotificationModel from "@/models/notification.model";
import PostModel from "@/models/posts.model";
import User from "@/models/user.model";
import Expo from "expo-server-sdk";

type props = {
  senderId: any;
  receiverId: any;
  type: String;
  postId?: any;
  seen?: Boolean;
};
export async function postNotication(payload: props) {
  try {
    payload["senderId"] = getValidId(payload.senderId);
    payload["receiverId"] = getValidId(payload.receiverId);
    if (payload.senderId.equals(payload.receiverId)) {
      return null;
    }

    const sender = await User.findById(payload.senderId);
    const body: any = {
      message: `${sender.name} - ${sender.username} - `,
    };
    if (payload.postId) {
      const mypost = await PostModel.findById(payload.postId).populate(
        "belongsTo"
      );
      if (payload.type == "LIKE") {
        if (mypost.belongsTo?._id) {
          if (mypost.belongsTo?.belongsTo) {
            body["message"] = body.message + `liked your reply`;
          } else {
            body["message"] = body.message + `liked your comment`;
          }
        } else {
          body["message"] = body.message + `liked your post`;
        }
        body["post"] = mypost;
      }
      // comment
      if (payload.type == "COMMENT") {
        if (mypost.belongsTo?.belongsTo) {
          body["message"] = body.message + `replied to your comment`;
        } else {
          body["message"] = body.message + `commented on your post`;
        }
        body["post"] = mypost;
      }
    }

    // send push noti
    const noti_token = await NotificationToken.find({
      userId: payload.receiverId,
    });

    const tokens: string[] = [];
    await Promise.all(
      noti_token.map((item: any) => {
        tokens.push(item.token);
      })
    );

    if (noti_token) {
      await sendPushNotification(tokens, body);
    }
    // end
    const data = await NotificationModel.create(payload);
    return data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

const sendPushNotification = async (
  targetExpoPushToken: string[],
  bodyMessage: any
) => {
  let expo = new Expo();

  // Create the messages that you want to send to clients
  let messages: any = [];
  for (let pushToken of targetExpoPushToken) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
    messages.push({
      to: pushToken,
      sound: "default",
      body: bodyMessage.message,
      data: { post: bodyMessage.post },
    });
  }

  // The Expo push notification service accepts batches of notifications so
  // that you don't need to send 1000 requests to send 1000 notifications. We
  // recommend you batch your notifications to reduce the number of requests
  // and to compress them (notifications with similar content will get
  // compressed).
  let chunks = expo.chunkPushNotifications(messages);
  let tickets: any = [];
  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
      } catch (error) {
        console.error(error);
      }
    }
  })();

  // Later, after the Expo push notification service has delivered the
  // notifications to Apple or Google (usually quickly, but allow the the service
  // up to 30 minutes when under load), a "receipt" for each notification is
  // created. The receipts will be available for at least a day; stale receipts
  // are deleted.
  //
  // The ID of each receipt is sent back in the response "ticket" for each
  // notification. In summary, sending a notification produces a ticket, which
  // contains a receipt ID you later use to get the receipt.
  //
  // The receipts may contain error codes to which you must respond. In
  // particular, Apple or Google may block apps that continue to send
  // notifications to devices that have blocked notifications or have uninstalled
  // your app. Expo does not control this policy and sends back the feedback from
  // Apple and Google so you can handle it appropriately.
  let receiptIds = [];

  for (let ticket of tickets) {
    // NOTE: Not all tickets have IDs; for example, tickets for notifications
    // that could not be enqueued will have error information and no receipt ID.
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }

  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  (async () => {
    // Like sending notifications, there are different strategies you could use
    // to retrieve batches of receipts from the Expo service.
    for (let chunk of receiptIdChunks) {
      try {
        let receipts: any = await expo.getPushNotificationReceiptsAsync(chunk);
        console.log(receipts);

        // The receipts specify whether Apple or Google successfully received the
        // notification and information about an error, if one occurred.
        for (let receiptId in receipts) {
          let { status, message, details } = receipts[receiptId];
          if (status === "ok") {
            continue;
          } else if (status === "error") {
            console.error(
              `There was an error sending a notification: ${message}`
            );
            if (details && details.error) {
              // The error codes are listed in the Expo documentation:
              // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
              // You must handle the errors appropriately.
              console.error(`The error code is ${details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  })();
};
