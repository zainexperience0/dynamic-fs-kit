import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { X } from 'lucide-react';
import { useState } from 'react';

export const Create = ({ data, setData }: any) => {
    const [optionInput, setOptionInput] = useState({
        label: '',
        value: '',
    });
    const [options, setOptions] = useState<any[]>([]);
    const [authRoleInput, setAuthRoleInput] = useState('');
    const [authRoles, setAuthRoles] = useState<string[]>([]);

    const handleFieldChange = (field: string, value: any) => {
        setData((prev: any) => ({
            ...prev,
            fieldCreate: {
                create: {
                    ...prev.fieldCreate?.create,
                    [field]: value
                }
            }
        }));
    };

    const handleAuthRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthRoleInput(e.target.value);
    };

    const handleAddAuthRole = () => {
        const trimmedRole = authRoleInput.trim();
        if (trimmedRole && !authRoles.includes(trimmedRole)) {
            const updatedRoles = [...authRoles, trimmedRole];
            setAuthRoles(updatedRoles);
            setAuthRoleInput('');
            handleFieldChange('authRoles', updatedRoles);
        }
    };

    const removeAuthRole = (role: string) => {
        const updatedRoles = authRoles.filter((r) => r !== role);
        setAuthRoles(updatedRoles);
        handleFieldChange('authRoles', updatedRoles);
    };

    const handleOptionChange = (field: keyof typeof optionInput, value: string) => {
        setOptionInput((prev) => ({ ...prev, [field]: value }));
    };

    const handleAddOption = () => {
        if (optionInput.label && optionInput.value) {
            const updatedOptions = [...options, optionInput];
            setOptions(updatedOptions);
            handleFieldChange('defaultValue', JSON.stringify(updatedOptions));
            setOptionInput({ label: '', value: '' });
        }
    };

    const removeOption = (index: number) => {
        const updatedOptions = options.filter((_, i) => i !== index);
        setOptions(updatedOptions);
        handleFieldChange('defaultValue', JSON.stringify(updatedOptions));
    };

    return (
        <div className="border rounded-lg p-6">
            <h1 className="text-2xl font-bold text-center mb-4">Field Create Actions</h1>
            <div className="space-y-4">
                {['isUI', 'isRequired', 'isAuth', 'isUnique'].map((field) => (
                    <div key={field} className="flex items-center justify-between">
                        <Label>{field}</Label>
                        <Switch
                            checked={data?.fieldCreate?.create?.[field]}
                            onCheckedChange={(e) => handleFieldChange(field, e)}
                        />
                    </div>
                ))}
                <div>
                    <Label>Default Options</Label>
                    <div className="border p-3 mt-3 space-y-2">
                        <Label>Label</Label>
                        <Input
                            value={optionInput.label}
                            onChange={(e) => handleOptionChange('label', e.target.value)}
                        />
                        <Label>Value</Label>
                        <Input
                            value={optionInput.value}
                            onChange={(e) => handleOptionChange('value', e.target.value)}
                        />
                        <Button onClick={handleAddOption}>
                            Add
                        </Button>
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between"
                            >
                                <span>{option.label}</span>
                                <span>{option.value}</span>
                                <X
                                    onClick={() => removeOption(index)}
                                    className='w-4 h-4 ml-2 border rounded-full border-red-500 cursor-pointer' />
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <Label>Auth Roles</Label>
                    <div className="flex space-x-2">
                        <Input
                            value={authRoleInput}
                            onChange={handleAuthRoleChange}
                            className="flex-1"
                        />
                        <Button onClick={handleAddAuthRole}>
                            Add
                        </Button>
                    </div>
                    <ul className="mt-4 space-y-2">
                        {authRoles.map((role, index) => (
                            <Badge key={index}>
                                {role}
                                <X
                                    onClick={() => removeAuthRole(role)}
                                    className='w-4 h-4 ml-2 border rounded-full' />
                            </Badge>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
