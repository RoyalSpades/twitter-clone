'use client'

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "@/app/Modal";
import { log } from "console";
import{ useCallback, useState} from "react";

const RegisterModal = () => {
    
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if(isLoading){
            return;
        }

        registerModal.onClose();
        loginModal.onOpen();
    },[isLoading, registerModal, loginModal])

    const onSubmit = useCallback(() => {
        try{    
            setIsLoading(true);

            // todo register and login

            registerModal.onClose();
        } catch (error){
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    },[loginModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p> Already have an account?  
                <span 
                    onClick={onToggle}
                    className="text-white cursor-pointer hover:underline">
                    Sign In
                </span>
            </p>
        </div>
    )

    return(
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Create an account"
            actionLabel="Register"
            onClose={registerModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;