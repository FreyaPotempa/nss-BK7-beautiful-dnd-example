import { Routes, Route } from "react-router-dom"
import { App } from "./App"
import { TaskSearch } from "./TaskSearch"


export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <App />
                </>
            }
            />
        </Routes>
    )
}