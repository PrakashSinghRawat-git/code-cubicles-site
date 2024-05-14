"use client";
import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { auth, googleAuthProvider } from "@/config/firebase";
import { signInWithPopup } from "firebase/auth";
import { globalStore } from "@/store/globalStore";

export default function SignIn() {
    const router = useRouter();
    const popupOpenedRef = useRef(false);
    const searchParams = useSearchParams();

    const { userInfo, setUserInfo } = globalStore();

    const signInWithGoogle = async () => {
        try {
            if (!popupOpenedRef.current) {
                popupOpenedRef.current = true;
                const result = await signInWithPopup(auth, googleAuthProvider);
                console.log("signed in with google: ", result);
                const userData = {
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                };

                localStorage.setItem("userInfo", JSON.stringify(userData));
                setUserInfo(userData);
                router.push(searchParams.get("redirect"));
            }
        } catch (error) {
            console.error(
                "error signing in with google: ",
                error.message || error
            );
        }
    };
    useEffect(() => {
        // return;

        signInWithGoogle();
    }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {/* Your sign-in component JSX */}
            <div>
                {" "}
                <p className="font-bold text-2xl">Signing in...</p>
                <p>If login window did not open, click here</p>
                <button className="border-gray-700 bg-sky-500 rounded-md px-5 py-3 cursor-pointer">
                    Sign In/ Register
                </button>
            </div>
        </Suspense>
    );
}
