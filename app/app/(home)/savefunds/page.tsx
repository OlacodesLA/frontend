"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Piggy from "../../../../public/savefunds/image 50.svg";
import background from "../../../../public/savefunds/Rectangle 40538.svg";


const savefunds = () => {
    return (  
        <div className="w-full bg-[#6139E70D]">
            <div className="bg-savefunds h-[100vh] bg-no-repeat bg-cover font-dm flex justify-center items-center flex-col">
            <div>
                <Image src={Piggy} alt="" className=""/>
            </div>
            <div className="flex flex-col items-center justify-center gap-5 text-center">
                    <h1 className="text-[32px] leading-[40px]">Save Money, Lock Money</h1>
                    <p className="text-[#4F5E71CC] text-[14px] px-20">Make use of the UZEL savings platform where you can safely deposit funds from your 
                        UZEL account into any currency you choose and earn up to 10% as interest yearly
                    </p>
                    <Link href="/app/savefunds/savingsdashboard">
                        <Button className="">Start Saving</Button>
                    </Link>
            </div>
           </div>
        </div>
    );
}
 
export default savefunds;