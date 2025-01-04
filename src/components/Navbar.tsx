'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    ListItem
} from "@/components/ui/navigation-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { BsHeart } from 'react-icons/bs';
import constants from '@/constants/index.d';
import { Search } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleOpen = () => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 50);
    };


    return (
        <>
            <nav
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#ffffff',
                    padding: '18px 24px 18px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 1000,
                    boxShadow: isScrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
                    transition: 'box-shadow 0.3s ease'
                }}
            >
                <div>
                    {constants.listMenu.map((item, index) => (
                        <div key={index} style={{ display: 'inline-block', marginRight: '1rem' }}>
                            <Link href={item.url}>
                                <span>{item.name}</span>
                            </Link>
                        </div>
                    ))}
                </div>
                <div style={{
                    width: '10%',
                    position: 'absolute',
                    left: '54%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center'
                }}>
                    <Image
                        src='/globe.svg'
                        alt='Logo'
                        width={50}
                        height={50}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem'
                    }}
                >

                    <Dialog onOpenChange={handleOpen}>
                        <DialogTrigger>
                            <Search />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle></DialogTitle>
                                <form className="relative w-full">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        placeholder='Search...'
                                        className="w-full pl-4 pr-10 py-2 border rounded-md no-focus"
                                    />
                                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500" />
                                </form>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger><span>CATEGORY</span></NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-4 w-full lg:grid-rows-[.75fr_1fr]">
                                        <ListItem href="/docs/primitives/typography" title="Typography">
                                        </ListItem>
                                        <ListItem href="/docs/primitives/typography" title="Typography">
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <Link href='/cart' className='flex items-center gap-1'>
                        <RiShoppingCart2Fill />
                        <span>CART</span>
                    </Link>
                    <Link href='/wishlist' className='flex items-center gap-1'>
                        <BsHeart />
                        WISHLIST
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;