
import Header from "@/components/header"
import { Outlet } from "react-router-dom"


const AppLayout = () => {
  return (
    <div>
        <main className="min-h-screen container">
            <Header/>
            <Outlet/>
        </main>
        <div className="p-10 text-center bg-purple-400 mt-10"> Made With ♥️ by Adarsh</div>
        
    </div>
  )
}

export default AppLayout