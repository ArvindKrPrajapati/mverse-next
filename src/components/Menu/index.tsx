"use client";
import React from "react";
import { AddMultipleIcon, DotMenuIcon } from "../_icons";
import Modal from "../Modal";

function Menu({ onOpen, isOpen, onClose, content, iconWidth = 24, text }: any) {
  return (
    <>
      <Modal
        title="menu"
        isOpen={isOpen}
        onClose={onClose}
        isMenu={true}
        body={content || <h1>this is menu</h1>}
        backdropClose={true}
        showHeader={false}
      />
      <button
        onClick={onOpen}
        className="transition focus:outline-none rounded-full p-2 h-full dark:active:bg-neutral-800 active:bg-gray-300"
      >
        {text ? (
          <div className="flex items-center gap-2 justify-center px-2">
            <AddMultipleIcon width={iconWidth} />
            {text}
          </div>
        ) : (
          <DotMenuIcon width={iconWidth} />
        )}
      </button>
    </>
  );
}

export default Menu;
