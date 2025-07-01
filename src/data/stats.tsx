import { BsBarChartFill, BsFillStarFill } from "react-icons/bs";
import { PiGlobeFill } from "react-icons/pi";

import { IStats } from "@/types/types";

export const stats: IStats[] = [
    {
        title: "10K+",
        icon: <BsBarChartFill size={34} className="text-blue-500" />,
        description:
            "Secrets stored securely every day, powering developer workflows worldwide.",
    },
    {
        title: "5.0",
        icon: <BsFillStarFill size={34} className="text-yellow-500" />,
        description:
            "User rating, consistently maintained across developer platforms and communities.",
    },
    {
        title: "100+",
        icon: <PiGlobeFill size={34} className="text-green-600" />,
        description:
            "Satisfied customers globally, from startups to enterprises, trusting us with their secrets.",
    },
];
