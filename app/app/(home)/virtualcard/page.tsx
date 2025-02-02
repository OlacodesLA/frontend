'use client'
import React from 'react';
import { useState } from 'react';
import Image from 'next/image'
import world from "../../../../public/savefunds/Group 1171275620.svg";
import WorldIcon from '@/components/icons/WorldIcon';
import SafeIcon from '@/components/icons/SafeIcon';
import ShopIcon from '@/components/icons/ShopIcon';
import SwiftIcon from '@/components/icons/SwiftIcon';
import { Button } from '@/components/ui/button';
import { VirtualCardModal } from '@/components/virtualcard/modals/virtualcardmodal';

export default function VirtualCard() {
     const [isVirtualCardModalOpen, setIsVirtualCardModalOpen] = useState(false);
  return (
    
          <div className="w-full">
              <div className="font-dm flex justify-center items-center flex-col">
                  <div>
                      <Image src={world} alt="" className="" />
                  </div>
                  <div className="">
                  <h1 className="text-[32px] leading-[40px] text-center">Simplified Global Expenditure</h1>
                  <div className='grid grid-cols-2 gap-10 py-10'>
                      <div className='flex gap-3 items-center text-left'>
                          <WorldIcon />
                          <div>
                              <h1>GLOBALLY ACCEPTED</h1>
                              <p className='text-[14px] text-[#4F5E71CC]'>Carry out transactions anywhere in the world with UZEL.</p>
                          </div>
                      </div>
                      <div className='flex gap-3 items-center text-left'>
                          <SafeIcon />
                          <div>
                              <h1>SAFE AND SECURE</h1>
                              <p className='text-[14px] text-[#4F5E71CC]'>With our 2FA, only you can access your UZEL account.</p>
                          </div>
                      </div>
                      <div className='flex gap-3 items-center text-left'>
                          <ShopIcon />
                          <div>
                              <h1>SPEND & AND SHOP INTERNATIONALLY</h1>
                              <p className='text-[14px] text-[#4F5E71CC]'>Buy or pay for anything all over the world with our virtual card</p>
                          </div>
                      </div>
                      <div className='flex gap-3 items-center text-left'>
                          <SwiftIcon />
                          <div>
                              <h1>SWIFT & INSTANT PAYMENT</h1>
                              <p className='text-[14px] text-[#4F5E71CC]'>Make payment instantly using our virtual card.</p>
                          </div>
                      </div>
                  </div>
                  <div className='flex justify-center items-center'>
                      <Button onClick={()=> setIsVirtualCardModalOpen(true)}>Get Started</Button>
                  </div>
                     <VirtualCardModal isOpen ={isVirtualCardModalOpen} onClose={()=> setIsVirtualCardModalOpen(false)} />
                  </div>
              </div>
          
    </div>
  )
}
