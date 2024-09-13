import { Children, createContext, useContext, useState } from "react";

const InfoContext = createContext();

const InfoProvider = ({ children }) => {
    const [nickname, setNickname] = useState("");
    const [pic, setPic] = useState("");
    return (
        <InfoContext.Provider value={{ nickname, setNickname, pic, setPic }}>{children}</InfoContext.Provider>
    )
}

export const InfoState = () => {
    return useContext(InfoContext);

}

export default InfoProvider;