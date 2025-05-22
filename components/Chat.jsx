"use client";

import { FaPaperPlane, FaSpinner, FaDoorClosed } from "react-icons/fa6";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";

const wsPath = "wss://chat.frensgo.lat/ws";
let socket = null;

// const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function Chat() {
  const { data: session, status } = useSession();
  const chatBX = useRef(null);
  useEffect(() => {
    if(status != "authenticated" && !session) return;
    console.log(status);
    socket = new WebSocket(
      `${wsPath}?username=${session?.user?.name}&email=${
        session?.user?.email
      }&avatar=${localStorage.getItem("avatar")}`
    );
    socket.addEventListener("open", onOpen);
    socket.addEventListener("close", onClosed);
    socket.addEventListener("message", onMessage);
  }, [status]);
  const [loader, setLoader] = useState(false);
  const [closed, setClosed] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgsList, setMsgsList] = useState([]);
  
  //FUNCIONES INTERNAS
  function sendMsg(e) {
    e.preventDefault();
    if(!msg || msg.length < 1 || msg.length > 150) return;
    socket.send(JSON.stringify({
      username: session.user.name,
      avatar: localStorage.getItem("avatar"),
      message: ["message", msg]
    }));
    setMsg("");
  }
  
  // function validar() {
  //     console.log(status)
  //     if(status !== 'authenticated' || !localStorage || !session.user) return false;
  //     return true;
  // }
  
  function onOpen() {
    setTimeout(() => {
      chatBX.current.scrollTop = chatBX.current.scrollHeight;
    }, 300);
    setLoader(false);
    setClosed(false);
    console.log("WS OPEN")
  }
  
  function onMessage(data) {
    const parsed = JSON.parse(data.data);
    const avatar = parsed.avatar;
    const username = parsed.username;
    const event = parsed.message[0];
    let msg = parsed.message[1];
    switch(event) {
      case "usersList":
        msg = JSON.parse(parsed.message[1]);
        console.log("Lista de usuarios : ", msg);
        setUsersList(msg);
        break;
      //NINGUN CODIGO ACA DENTRO PUEDE SETEAR EL MSGSLIST
      case "message":
        const tempMsg = {
          username,
          avatar,
          msg
        }
        setMsgsList(state => [...state, tempMsg]);
        setTimeout(() => {
          chatBX.current.scrollTop = chatBX.current.scrollHeight;
        }, 300);
        break;
      case "cacheList":
        msg = JSON.parse(parsed.message[1]);
        if(msg.length == 0) return;
        //PREPARAMOS LA LISTA DE CACHE
        let tempArr = [];
        msg.forEach(e => {
          let x = JSON.parse(e);
          const tempMsg = {
            username: x.username,
            avatar: x.avatar,
            msg: x.message[1]
          }
          tempArr.push(tempMsg);
        });
        setMsgsList(tempArr);
        break;
      default:
          console.log("algo");
    }
  }
  
  function onClosed() {
    setLoader(false);
    setClosed(true);
    console.log("WS CLOSED");
  }
  
  //RENDERS
  if (status !== "authenticated") {
    return (
      <div
        className="sticky top-[80px] bg-slate-100 h-[85vh] max-h-[85vh] overflow-y-auto rounded-lg w-full
                flex flex-col gap-4 p-4 justify-center items-center"
      >
        <h1 className="break-words text-3xl text-center text-violet-950 font-bold">
          Registrese para conectarse al chat de frenss
        </h1>
      </div>
    );
  }

  if(status == "authenticated" && loader) {
    return (
        <div
          className="sticky top-[80px] bg-slate-100 h-[85vh] max-h-[85vh] overflow-y-auto rounded-lg w-full
                  flex flex-col gap-4 p-4 justify-center items-center"
        >
          <FaSpinner size={70} color={"slateblue"} className="animate-spin"/>
          <h3 className="my-4 text-violet-950 text-2xl text-center font-extrabold">Conectando a frenschat...</h3>
        </div>
      );
  }

  if(status == "authenticated" && closed) {
    return (
        <div
          className="sticky top-[80px] bg-slate-100 h-[85vh] max-h-[85vh] overflow-y-auto rounded-lg w-full
                  flex flex-col gap-4 p-4 justify-center items-center"
        >
          <FaDoorClosed size={70} color={"slateblue"} />
          <h3 className="my-4 text-violet-950 text-2xl text-center font-extrabold">Chatcito de frenss</h3>
        </div>
      );
  }


  return (
    <div
      className="sticky top-[80px] bg-slate-100 h-[85vh] max-h-[85vh] overflow-y-auto rounded-lg w-full
        flex flex-col gap-4 p-4"
    >
      <div
        className="userlist p-2 flex gap-2 overflow-x-auto overflow-y-hidden flex-row"
        style={{ flex: "1" }}
      >
        {usersList.map((user, key) => (
          <div className="flex flex-col gap-1 justify-center items-center" key={key}>
            <img 
              src={user.avatar} alt={`Avatar de ${user.username}`} 
              className="rounded-full w-[45px] h-[45px]"
            />
            <p className="text-black font-bold">{user.username.slice(0, 5)}</p>
          </div>
        ))}
      </div>
      <div
        className="chatBX bg-slate-900 rounded-lg flex flex-col gap-4 p-4 overflow-x-hidden overflow-y-auto"
        style={{ flex: "10" }}
        ref={chatBX}
      >
        {msgsList.map((val, key) => (
          <div className="flex flex-row gap-2" key={key}>
            {/* FOTO DE USUARIO */}
            <div className="shrink-0">
              <img 
                src={val.avatar} alt={`Avatar de ${val.username}`} 
                className="w-[40px] h-[40px] rounded-full"
              />
            </div>
            {/* NOMBRE DE USUARIO Y MENSAJE */}
            <div className="flex flex-col gap-2">
              <p className="text-white font-bold">{val.username}</p>
              <p className="text-white w-full">{val.msg}</p>
            </div>
          </div>
        ))}
      </div>
      <form
        className="flex justify-center items-center gap-4"
        style={{ flex: "1" }}
        onSubmit={sendMsg}
      >
        <input
          type="text"
          placeholder="Escriba un mensaje..."
          className="w-full p-4 rounded-lg bg-slate-900 text-white font-bold"
          minLength={1}
          maxLength={150}
          value={msg}
          onChange={e=>setMsg(e.target.value)}
          required
        />
        <button type="submit">
          <FaPaperPlane size={25} color={"#000"} />
        </button>
      </form>
    </div>
  );
}
