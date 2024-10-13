// import { createContext, useEffect, useState } from "react";
// export const ToDoContext = createContext();

// const ToDoProvider = ({ children }) => {
//   const [localData, setLocalData] = useState([]);

//   useEffect(() => {
//     const data = localStorage.getItem("todoData");
//     if (data) {
//       try {
//         let parsedData = JSON.parse(data);
//         if (!Array.isArray(parsedData)) {
//           parsedData = [parsedData];
//         }
//         setLocalData(parsedData);
//       } catch (error) {
//         console.error("Error parsing localStorage data:", error);
//         setLocalData([]);
//       }
//     }
//   }, []);

//   const addToDo = (data) => {
//     try {
//       let storedData = localStorage.getItem("todoData");
//       let todoList = storedData ? JSON.parse(storedData) : [];

//       if (!Array.isArray(todoList)) {
//         todoList = [];
//       }
//       todoList.push(data);
//       localStorage.setItem("todoData", JSON.stringify(todoList));
//     } catch (err) {
//       console.error("Error storing data", err);
//     }
//   };

//   return (
//     <ToDoContext.Provider value={{ addToDo, localData, setLocalData }}>
//       {children}
//     </ToDoContext.Provider>
//   );
// };
// export default ToDoProvider;
