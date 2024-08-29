import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { X } from 'lucide-react';
import { useState } from 'react';

export const Create = ({ data, setData }: any) => {
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
                    <Label>Default Value</Label>
                    <Calendar
                        mode='single'
                        selected={data?.fieldCreate?.create?.defaultValue}
                        onSelect={(e)=> handleFieldChange("defaultValue", JSON.stringify(e))}
                    />
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
