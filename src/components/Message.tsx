type Props = {
  message: Message;
};

function Message({ message }: Props) {
  const isChatGPT = message.author.name === "ChatGPT";
  return (
    <div className={`py-5 flex text-white ${isChatGPT && "bg-[#434654]"} `}>
      <div className={"flex gap-5 px-4 md:px-10"}>
        <img
          src={message.author.avatar}
          alt=""
          className="h-8 w-8 rounded-full"
        />
        <p className="pt-1 text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
