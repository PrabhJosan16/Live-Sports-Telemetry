import { useEffect, useState } from "react"

export default function useLiveData() {
    const [data, setData] = useState([])

    useEffect(() => {
        const ws = new WebSocket(import.meta.env.VITE_WS_URL)

        ws.onopen = () => {
            console.log("Connected to backend WebSocket")
        }

        ws.onmessage = (event) => {
            try {
                const parsed = JSON.parse(event.data)
                setData(parsed)
            } catch (err) {
                console.error("Failed to parse WebSocket message:", err)
            }
        }

        ws.onerror = (err) => {
            console.error("WebSocket error:", err)
        }

        return () => ws.close()
    }, [])

    return data
}
