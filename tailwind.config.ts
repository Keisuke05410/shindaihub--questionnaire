import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                blackcustum: "#121326",
                bluenormal: "#348ABF",
                bluethin: "63CAF2",
                bluethick: "#1E4359",
                whitecustum: "#F2F2F2",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["cupcake"],
    },
};
export default config;
