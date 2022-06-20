import emitter from "./emitter";

const pushMsgState =  {

    MsgNotice (response, title = '更新') {
    if (response.data.success) {
        emitter.emit("push-message", {
          style: "success",
          title: `${title}成功囉！`,
        });
      } else {
        //   統一格式message為字串
        const message = typeof response.data.message === 'string' ? [response.data.message] : response.data.message
        emitter.emit("push-message", {
          style: "danger",
          title: `${title}失敗 `,
          content: message.join("、"),
        });
      }
} 

}

export default pushMsgState