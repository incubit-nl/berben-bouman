import React from 'react';
import Image from 'next/image';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
    title: 'About Us | title',
    description: 'Learn more about title, our mission, and our team.',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export default function AboutPage() {
    return (
        <main className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">About title</h1>
                
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                    <p className="mb-4">
                        At title, we're dedicated to making yoga accessible to everyone, everywhere. 
                        We believe in the transformative power of yoga to improve physical health, 
                        mental wellbeing, and spiritual growth.
                    </p>
                    <p>
                        Our platform connects students with experienced teachers, offering a variety 
                        of practices for all skill levels and preferences.
                    </p>
                </section>
                
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="md:w-1/2">
                            <p className="mb-4">
                                Founded in 2023, title began with a simple idea: to create a platform that brings 
                                the benefits of yoga to people regardless of their location or schedule constraints.
                            </p>
                            <p>
                                What started as a small community has grown into a global network of practitioners 
                                and teachers united by their passion for yoga and wellness.
                            </p>
                        </div>
                        <div className="md:w-1/2 relative h-64 w-full">
                            <Image 
                                src="/images/about-placeholder.jpg" 
                                alt="title founder in yoga pose" 
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </section>
                
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Inclusivity - Yoga is for everybody and every body</li>
                        <li>Authenticity - Honoring yoga's traditional roots while embracing modern approaches</li>
                        <li>Community - Fostering connection among practitioners worldwide</li>
                        <li>Growth - Supporting continuous learning and development</li>
                        <li>Wellbeing - Promoting holistic health in mind, body, and spirit</li>
                    </ul>
                </section>
                
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Join Our Journey</h2>
                    <p className="mb-6">
                        Whether you're just beginning your yoga practice or are an experienced yogi, 
                        we invite you to be part of our growing community.
                    </p>
                    <div className="flex justify-center">
                        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                            Start Your Practice Today
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
}
