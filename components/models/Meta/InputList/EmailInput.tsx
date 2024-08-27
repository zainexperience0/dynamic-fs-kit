import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export const EmailInput = ({ data, setData }: any) => {
    const [emailError, setEmailError] = useState<string | null>(null);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        if (validateEmail(email)) {
            setEmailError(null);
            setData({
                ...data,
                fields: {
                    create: {
                        value: email,
                    },
                },
            });
        } else {
            setEmailError('Invalid email format');
        }
    };

    return (
        <div className="mx-auto">
            <div className="space-y-6 border rounded-lg p-6">
                <div>
                    <Label>Name</Label>
                    <Input
                        value={data.name}
                        onChange={(e) =>
                            setData({
                                ...data,
                                name: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <Label>Value</Label>
                    <Input
                        type="email"
                        value={data?.fields?.create?.value}
                        onChange={handleEmailChange}
                    />
                    {emailError && (
                        <p className="text-red-500 text-sm mt-1">
                            {emailError}
                        </p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <Label>Is Searchable</Label>
                    <Switch
                        checked={data.isSearchable}
                        onCheckedChange={(e) =>
                            setData({
                                ...data,
                                isSearchable: e,
                            })
                        }
                        className="ml-2"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Label>Is Sortable</Label>
                    <Switch
                        checked={data.isSortable}
                        onCheckedChange={(e) =>
                            setData({
                                ...data,
                                isSortable: e,
                            })
                        }
                        className="ml-2"
                    />
                </div>
            </div>
        </div>
    );
};
