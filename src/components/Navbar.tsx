'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
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
import { useIsMobile } from '@/hooks/use-mobile';
import { useCart } from '@/context/CartContext';
import { getCount } from '@/lib/AddToChart';
import { useRouter } from 'next/navigation';

const Navbar = ({ children }: { children: React.ReactNode }) => {
    const isMobile = useIsMobile();
    const { cart } = useCart();
    const router = useRouter();

    const [isScrolled, setIsScrolled] = useState(false);
    const [countProductAtCart, setCountProductAtCart] = useState(0);
    const [searchOpen, setSearchOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setCountProductAtCart(getCount());
    }, [cart])

    const inputRef = useRef<HTMLInputElement>(null);

    const handleOpen = (e: boolean) => {
        setSearchOpen(e)
        setTimeout(() => {
            inputRef.current?.focus();
        }, 50);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const q = formData.get('search') as string;
        setSearchOpen(false);
        setTimeout(() => {
            router.push('/?q=' + q);
        }, 500);
    }

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
                {isMobile ? children : <></>}
                <div className={`${isMobile ? 'hidden' : ''}`}>
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
                    <Link href="/">
                        <Image
                            src='/globe.svg'
                            alt='Logo'
                            width={50}
                            height={50}
                        />
                    </Link>
                </div>
                <div
                    className={`${isMobile ? 'hidden' : 'flex'}`}
                    style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem'
                    }}
                >

                    <Dialog onOpenChange={handleOpen} open={searchOpen}>
                        <DialogTrigger>
                            <Search />
                        </DialogTrigger>
                        <DialogContent aria-describedby="modal-content">
                            <DialogHeader>
                                <DialogTitle></DialogTitle>
                                <DialogDescription>
                                    Search By Name Product
                                </DialogDescription>
                                <form className="relative w-full" onSubmit={handleSubmit}>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        name="search"
                                        placeholder='Search...'
                                        className="w-full pl-2 py-2 border rounded-md no-focus bg-white"
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
                    <Link href='/cart'>
                        <div className="indicator">
                            <span className={`indicator-item badge badge-info ${countProductAtCart < 1 ? 'hidden' : ''}`}>{countProductAtCart}</span>
                            <div className='flex items-center gap-1 px-2'>
                                <RiShoppingCart2Fill />
                                <span>CART</span>
                            </div>
                        </div>
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