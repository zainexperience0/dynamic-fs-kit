import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export const PasswordInput = ({ data, setData }: any) => {
    return (
        <div className="mx-auto">
        <div className="space-y-6 border rounded-lg p-6">
            <div>
                <Label>
                    Name
                </Label>
                <Input
                    value={data.name}
                    onChange={(e) => setData({
                        ...data,
                        name: e.target.value,
                    })}
                />
            </div>
            <div>
                <Label>
                    Value
                </Label>
                <Input
                    type="password"
                    value={data?.fields?.create?.value}
                    onChange={(e) => setData({
                        ...data,
                        fields: {
                            create: {
                                value: e.target.value,
                            },
                        },
                    })}
                />
            </div>

            <div className="flex items-center justify-between">
                <Label>
                    Is Searchable
                </Label>
                <Switch
                    checked={data.isSearchable}
                    onCheckedChange={(e) => setData({
                        ...data,
                        isSearchable: e,
                    })}
                    className="ml-2"
                />
            </div>
            <div className="flex items-center justify-between">
                <Label>
                    Is Sortable
                </Label>
                <Switch
                    checked={data.isSortable}
                    onCheckedChange={(e) => setData({
                        ...data,
                        isSortable: e,
                    })}
                    className="ml-2"
                />
            </div>
        </div>
    </div>
    )
}
