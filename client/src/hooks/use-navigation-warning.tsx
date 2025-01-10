// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router";


// const useNavigationWarning = (
//   shouldBlockNavigation: boolean,
//   message: string
// ) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const lastLocation = { current: location };
//   const isBlocked = { current: false };

//   useEffect(() => {
//     // const unblock = () => {
//     //   if (shouldBlockNavigation && !isBlocked.current) {
//     //     const confirmLeave = window.confirm(message);
//     //     if (!confirmLeave) {
//     //       isBlocked.current = false;
//     //       return;
//     //     }
//     //     isBlocked.current = true;
//     //     navigate(lastLocation.current.pathname + lastLocation.current.search, {
//     //       replace: true,
//     //     });
//     //   }
//     // };


//     const unblock = navigate.listen((nextLocation) => {
//       if (!isBlocked.current && shouldBlockNavigation) {
//         const confirmLeave = window.confirm(message);
//         if (!confirmLeave) {
//           isBlocked.current = false; // Cancel navigation
//           return false;
//         }
//         isBlocked.current = true; // Allow navigation
//       }
//       lastLocation.current = nextLocation;
//       isBlocked.current = false;
//       return true; // Allow navigation
//     });

//     const handleBeforeUnload = (event: BeforeUnloadEvent) => {
//       if (shouldBlockNavigation) {
//         event.preventDefault();
//         event.returnValue = message;
//       }
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       unblock();
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [navigate, shouldBlockNavigation, message]);
// };

// export default useNavigationWarning;