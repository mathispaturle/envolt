import {
    FiLock,
    FiShare2,
    FiUsers,
    FiKey,
    FiCloud,
    FiUpload,
    FiShield,
    FiFolder,
    FiZap,
} from "react-icons/fi";

import { IBenefit } from "@/types/types";

export const benefits: IBenefit[] = [
    {
        title: "Effortless Secret Sharing",
        description:
            "Share environment variables securely with teammates or across projects, without the copy-paste chaos.",
        bullets: [
            {
                title: "Invite-based Access",
                description: "Only the right people get access — no accidental leaks.",
                icon: <FiShare2 size={26} />,
            },
            {
                title: "Role & Team Management",
                description: "Control who sees what at a granular level.",
                icon: <FiUsers size={26} />,
            },
            {
                title: "Time-limited Vault Links",
                description: "Send secrets with expiration times and auto-deletion.",
                icon: <FiZap size={26} />,
            },
        ],
        imageSrc: "/images/1.png",
    },
    {
        title: "Encrypted Vaults for Teams",
        description:
            "Your environment variables, safely stored and instantly synced across your stack — for devs, by devs.",
        bullets: [
            {
                title: "256-bit AES Encryption",
                description: "Bank-grade encryption for every variable and file.",
                icon: <FiLock size={26} />,
            },
            {
                title: "Cloud Sync with Firebase",
                description: "Instant updates to secrets across your team or CI/CD pipelines.",
                icon: <FiCloud size={26} />,
            },
            {
                title: "Backup & Versioning",
                description: "Never lose track of changes. Roll back with confidence.",
                icon: <FiFolder size={26} />,
            },
        ],
        imageSrc: "/images/2.png",
    },
    {
        title: "Designed for Developer Speed",
        description:
            "Simple by default. Powerful when you need it. Envolt plugs into your workflow without getting in the way.",
        bullets: [
            {
                title: "Command Line & API First",
                description: "Use Envolt right from your terminal or CI scripts.",
                icon: <FiKey size={26} />,
            },
            {
                title: "Seamless Imports",
                description: "Upload your `.env` files in seconds, structured and ready to use.",
                icon: <FiUpload size={26} />,
            },
            {
                title: "Built-In Access Logging",
                description: "Track who accessed what, and when — no black boxes.",
                icon: <FiShield size={26} />,
            },
        ],
        imageSrc: "/images/3.png",
    },
];
