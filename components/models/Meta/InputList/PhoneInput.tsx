import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export const PhoneInput = ({ data, setData }: any) => {
    const [phoneError, setPhoneError] = useState<string | null>(null);

    const validatePhone = (phone: string) => {
        const phoneRegex = /^\d{1,11}$/; // Matches 1 to 11 digits
        return phoneRegex.test(phone);
    };

    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const phone = e.target.value;
        if (validatePhone(phone)) {
            setPhoneError(null);
            setData({
                ...data,
                fields: {
                    create: {
                        value: phone,
                    },
                },
            });
        } else {
            setPhoneError('Phone number must be between 1 and 11 digits');
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        // Only update state if the new value is valid
        if (validatePhone(newValue)) {
            setData({
                ...data,
                fields: {
                    create: {
                        value: newValue,
                    },
                },
            });
            setPhoneError(null);
        } else {
            setPhoneError('Phone number must be between 1 and 11 digits');
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
                        type="text"
                        value={data.fields?.create?.value || ''}
                        onChange={handlePhoneChange}
                        onInput={handlePhoneInput}
                        placeholder="Enter phone number"
                    />
                    {phoneError && (
                        <p className="text-red-500 text-sm mt-1">
                            {phoneError}
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
