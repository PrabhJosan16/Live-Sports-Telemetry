import { useEffect, useState } from "react"

type SpeedEntry = {
    car_number: string | number;
    speed?: number;
};

export default function LiveSpeed() {
    const [data, setData] = useState<SpeedEntry[]>([])

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:4000")

        ws.onmessage = (event) => {
            console.log("Raw WS message:", event.data)
            try {
                const parsed = JSON.parse(event.data)


                if (Array.isArray(parsed)) {
                    const speeds = parsed.map((p: any) => ({
                        car_number: p.car_number,
                        speed: p.speed ?? null,
                    }))
                    setData(speeds)
                }
            } catch (e) {
                console.error("WS parse error:", e)
            }
        }

        ws.onopen = () => console.log("Connected to backend WS")
        ws.onclose = () => console.log(" Disconnected from backend WS")

        return () => ws.close()
    }, [])

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Live Speeds</h2>
            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-2 py-1">Car</th>
                        <th className="border px-2 py-1">Speed (km/h)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry) => (
                        <tr key={entry.car_number}>
                            <td className="border px-2 py-1 text-center">{entry.car_number}</td>
                            <td className="border px-2 py-1 text-center">{entry.speed ?? "—"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
