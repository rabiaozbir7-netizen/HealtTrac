/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#3B82F6",
                secondary: "#10B981",
                accent: "#F59E0B",
                background: "#F3F4F6",
                dark: {
                    background: "#111827",
                    card: "#1F2937",
                    text: "#F9FAFB",
                }
            },
        },
    },
    plugins: [],
}
