// Login.tsx

import axios from 'axios';
import React, { useState } from 'react';
import { useAuthStore } from '../../stores';

const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            if (event.target?.result) {
                resolve(event.target.result as string);
            } else {
                reject(new Error('Failed to read file content'));
            }
        };

        reader.onerror = () => {
            reject(new Error('Error reading file'));
        };

        // Read the content of the file as text
        reader.readAsText(file);
    });
};

const extractUserId = (token: string) => {
    try {
        const [header, payload] = token.split('.').slice(0, 2);
        const decodedPayload = JSON.parse(atob(payload));
        const subField = decodedPayload.sub;
        return subField;
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
}


const Login: React.FC = () => {
    const [jsonFile, setJsonFile] = useState<File | undefined>(undefined);
    const [otpInput, setOtpInput] = useState('');
    const [otpSubmit, setOtpSubmit] = useState<boolean>(false);
    const { setAccessToken, setViewToken, viewToken,accessToken,sessionToken,setSessionToken } = useAuthStore()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setJsonFile(file);
    };


    const handleLogin = async () => {
        // Your login logic here
        interface AuthData {
            basicToken: string;
            apiUsername: string;
            apiPassword: string;
            pan: string;
            password: string;
        };

        let loginInfo: AuthData = {
            basicToken: '',
            apiUsername: '',
            apiPassword: '',
            pan: '',
            password: '',
        };
        if (jsonFile) {
            try {
                const jsonContent = await readFileAsText(jsonFile);
                loginInfo = JSON.parse(jsonContent);
            } catch (error) {
                console.error('Error reading or parsing JSON:', error);
            }
        }

        let response = await axios.post('http://localhost:3003/user/login', loginInfo)
        setAccessToken(response.data.accessToken)
        setViewToken(response.data.viewToken)
        setOtpSubmit(true)
    };

    const handleOTP = async () => {
        if(!otpInput){
            console.log('please enter otp')
        }
        interface OtpData {
            otp: string;
            userId: string;
            sid?: string;
            auth?: string;
            authorization?: string;
        };

        let otpInfo: OtpData = {
            otp: otpInput,
            userId: extractUserId(viewToken?.token || ''),
            sid: viewToken?.sid,
            auth: viewToken?.token,
            authorization: accessToken?.access_token
        };
        try{
            let response = await axios.post('http://localhost:3003/user/login/otp', otpInfo)
            setSessionToken(response.data)
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6">Login With kotak</h2>

                {/* JSON File Input */}
                {!otpSubmit && <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Upload JSON File:</label>
                    <input
                        type="file"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                        onChange={handleFileChange}
                    />
                </div>}

                {/* OTP Input */}
                {otpSubmit
                    &&
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">OTP:</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                            placeholder="Enter OTP"
                            value={otpInput}
                            onChange={(e) => setOtpInput(e.target.value)}
                        />
                    </div>
                }
                {
                    otpSubmit ?
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue w-full"
                            onClick={handleOTP}
                        >
                            Login
                        </button>
                        :
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue w-full"
                            onClick={handleLogin}
                        >
                            Get OTP
                        </button>
                }
            </div>
        </div>
    );
};

export default Login;
