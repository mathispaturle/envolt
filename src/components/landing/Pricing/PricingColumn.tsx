'use client'

import clsx from "clsx";
import { BsFillCheckCircleFill } from "react-icons/bs";

import { IPricing } from "@/types/types";
import { useRouter } from 'next/navigation';

interface Props {
    tier: IPricing;
    highlight?: boolean;
    cta?: string;
    type: 'login' | 'contact' | 'stripe';
    available: boolean
}

const PricingColumn: React.FC<Props> = ({ tier, highlight, cta, type, available }: Props) => {
    const { name, price, features } = tier;

    const router = useRouter()

    const handleClick = async () => {

        if (type == "login") {
            router.push("/auth?type=signup")
        } else if (type == "contact") {
            router.push("/contact")
        } else {
            const response = await fetch('/api/payments/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId: 'price_1RfO6cBB9uwLhbGgIHgl4lxj',
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Error creating session:', data.error);
            } else {
                console.log('Success:', data);
                router.push(data.url)
                // Optional: redirect to Stripe or show confirmation
            }
        }
    }

    return (
        <div className={clsx("w-full max-w-sm mx-auto bg-white rounded-xl border border-gray-200 lg:max-w-full", { "shadow-lg": highlight })}>
            <div className="p-6 border-b border-gray-200 rounded-t-xl">
                <h3 className="text-2xl font-semibold ">{name}</h3>
                {
                    available == false ? <p className='text-sm text-neutral-600'>Comming soon</p> : <p className='text-sm text-transparent'>.</p>
                }
                <p className="text-3xl md:text-5xl font-bold mb-6 mt-4">
                    <span className={clsx({ "text-foreground": highlight })}>
                        {typeof price === 'number' ? `$${price}` : price}
                    </span>
                    {typeof price === 'number' && <span className="text-lg font-normal text-gray-600">/mo</span>}
                </p>
                <button onClick={handleClick} disabled={!available} className={clsx("w-full disabled:opacity-45 disabled:cursor-not-allowed py-3 text-white px-4 cursor-pointer rounded-full transition-colors font-semibold", { "bg-primary hover:bg-primary-accent": highlight, "bg-muted hover:bg-gray-200 !text-foreground": !highlight })}>
                    {cta || "Select Plan"}
                </button>
            </div>
            <div className="p-6 mt-1">
                <p className="font-bold mb-0">FEATURES</p>
                <ul className="space-y-4 mb-8 mt-2">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                            <BsFillCheckCircleFill className="h-5 w-5 text-primary mr-2" />
                            <span className="text-foreground-accent">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PricingColumn