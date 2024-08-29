import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Create = ({ data, setData }: any) => {
    const [authRoleInput, setAuthRoleInput] = useState<any>('');
    const [authRoles, setAuthRoles] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [pendingTag, setPendingTag] = useState('');

    const handleFieldChange = (field: any, value: any) => {
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

    const handleAddTag = () => {
        if (!pendingTag) return;
        const newTags = Array.from(new Set([...tags, ...pendingTag.split(",").map(tag => tag.trim())]));
        setTags(newTags);
        handleFieldChange('defaultValue', JSON.stringify(newTags));
        setPendingTag("");
    };

    useEffect(() => {
        if (pendingTag.includes(",")) {
            handleAddTag();
        }
    }, [pendingTag]);

    const handleRemoveTag = (tag: any) => {
        const updatedTags = tags.filter(t => t !== tag);
        setTags(updatedTags);
        handleFieldChange('defaultValue', JSON.stringify(updatedTags));
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

    const removeAuthRole = (role: any) => {
        const updatedRoles = authRoles.filter(r => r !== role);
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
                            onCheckedChange={(checked) => handleFieldChange(field, checked)}
                        />
                    </div>
                ))}
                <div>
                    <Label>Default Tags</Label>
                    <div className={cn("border px-2 rounded-md flex items-center space-x-2 mt-2")}>
                        {tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="rounded text-sm font-light flex items-center">
                                {tag}
                                <Button variant="ghost" size="icon" className="ml-2 h-3 w-3" onClick={() => handleRemoveTag(tag)}>
                                    <X className="w-3" />
                                </Button>
                            </Badge>
                        ))}
                        <Input
                            className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                            value={pendingTag}
                            onChange={(e) => setPendingTag(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === ",") {
                                    e.preventDefault();
                                    handleAddTag();
                                } else if (e.key === "Backspace" && !pendingTag && tags.length) {
                                    e.preventDefault();
                                    handleRemoveTag(tags[tags.length - 1]);
                                }
                            }}
                            placeholder="Type a tag and press Enter"
                        />
                    </div>
                </div>
                <div>
                    <Label>Auth Roles</Label>
                    <div className="flex space-x-2">
                        <Input
                            value={authRoleInput}
                            onChange={(e) => setAuthRoleInput(e.target.value)}
                            className="flex-1"
                        />
                        <Button onClick={handleAddAuthRole}>Add</Button>
                    </div>
                    <ul className="mt-4 space-y-2">
                        {authRoles.map((role, index) => (
                            <Badge key={index}>
                                {role}
                                <X
                                    onClick={() => removeAuthRole(role)}
                                    className='w-4 h-4 ml-2 border rounded-full cursor-pointer' />
                            </Badge>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
