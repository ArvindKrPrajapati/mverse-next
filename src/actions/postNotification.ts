import { getValidId } from "@/lib/serverCookies";
import NotificationModel from "@/models/notification.model";

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
    const data = await NotificationModel.create(payload);
    return data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
