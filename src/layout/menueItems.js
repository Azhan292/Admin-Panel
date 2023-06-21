import {
  AiOutlineOrderedList,
  AiOutlineUsergroupDelete,
  AiFillGift,
} from "react-icons/ai";
import { FaSitemap } from "react-icons/fa";
export const MenueItems = [
  {
    key: 1,
    label: "Customer",
    icon: <AiOutlineUsergroupDelete className="icon" />,
    path: "/users",
  },
  {
    key: 2,
    label: "All Vendors",
    icon: <AiOutlineOrderedList className="icon" />,
    path: "/vendors",
  },
  {
    key: 3,
    label: "Payment",
    icon: <AiFillGift className="icon" />,
    path: "/promos",
  },
  {
    key: 4,
    label: "All Orders",
    icon: <FaSitemap className="icon" />,
    path: "/all-orders",
  },
];
