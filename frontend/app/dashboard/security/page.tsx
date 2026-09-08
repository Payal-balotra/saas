"use client";

import { useState } from "react";
import { authClient } from "@/src/lib/auth-client";
import { QRCodeSVG } from "qrcode.react";

export default function SecurityPage() {
    const [password, setPassword] = useState("");
    const [totpURI, setTotpURI] = useState("");
    const [backupCodes, setBackupCodes] = useState<string[]>([]);
    const [error, setError] = useState("");

    const enable2FA = async () => {
        const { data, error } = await authClient.twoFactor.enable({
            password,
            method: "totp",
        });

        if (error) {
            console.log(error);
            return;
        }

        if (data.method === "totp") {
            setTotpURI(data.totpURI);
            setBackupCodes(data.backupCodes);
        }
    };

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">
                Security
            </h1>

            <h2 className="mt-6 text-lg font-semibold">
                Two-Factor Authentication
            </h2>

            {!totpURI && (
                <div className="mt-4 space-y-4">
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded border p-2"
                    />

                    <br />

                    <button
                        onClick={enable2FA}
                        className="rounded bg-black px-4 py-2 text-white"
                    >
                        Enable 2FA
                    </button>
                </div>
            )}

            {error && (
                <p className="mt-4 text-red-500">
                    {error}
                </p>
            )}

            {totpURI && (
                <div className="mt-6">
                    <p>
                        2FA setup started. Your TOTP URI is:
                    </p>

                    <p className="mt-2 break-all text-sm">
                        {totpURI && (
                            <div>
                                <h2>Scan this QR code</h2>

                                <QRCodeSVG value={totpURI} size={200} />

                                <p>Scan this using Google Authenticator.</p>
                            </div>
                        )}
                    </p>

                    <h3 className="mt-6 font-semibold">
                        Backup Codes
                    </h3>

                    {backupCodes.map((code) => (
                        <p key={code}>
                            {code}
                        </p>
                    ))}
                </div>
            )}
        </main>
    );
}