import { TextInput } from './InputList/TextInput'
import { PasswordInput } from './InputList/PasswordInput'
import { NumberInput } from './InputList/NumberInput'
import { EmailInput } from './InputList/EmailInput'
import { PhoneInput } from './InputList/PhoneInput'
import { TextAreaInput } from './InputList/TextArea'
import { DateInput } from './InputList/DateInput/DateInput'
import { SwitchInput } from './InputList/SwitchInput/SwitchInput'
import { CheckBoxInput } from './InputList/checkboxInput/CheckBoxInput'
import { SelectInput } from './InputList/SelectInput/SelectInput'
import { MultiSelectInput } from './InputList/MultiSelectInput/MultiSelectInput'
import { FileInput } from './InputList/FileInput'
import { UrlInput } from './InputList/UrlInput'
import { MarkdownInput } from './InputList/MarkDownInput'
import { TagInput } from './InputList/TagInput/TagInput'
import { MultiToggleInput } from './InputList/MultiToggle.tsx/MultiToggleInput'
import { ToggleInput } from './InputList/ToggleInput/ToggleInput'


export const RenderInput = ({ data, setData }: any) => {
    const inputComponents: any = {
        textInput: (
            <TextInput data={data} setData={setData} />
        ),
        passwordInput: (
            <PasswordInput data={data} setData={setData} />
        ),
        numberInput: (
            <NumberInput data={data} setData={setData} />
        ),
        emailInput: (
            <EmailInput data={data} setData={setData} />
        ),
        phoneInput: (
            <PhoneInput data={data} setData={setData} />
        ),
        textareaInput: (
            <TextAreaInput data={data} setData={setData} />
        ),
        dateInput: (
            <DateInput data={data} setData={setData} />
        ),
        switchInput: (
            <SwitchInput data={data} setData={setData} />
        ),
        checkboxInput: (
            <CheckBoxInput data={data} setData={setData} />
        ),
        selectInput: (
            <SelectInput data={data} setData={setData} />
        ),
        msSelectInput: (
            <MultiSelectInput data={data} setData={setData} />
        ),
        fileInput: (
            <FileInput data={data} setData={setData} />
        ),
        urlInput: (
            <UrlInput data={data} setData={setData} />
        ),
        markdownInput: (
            <MarkdownInput data={data} setData={setData} />
        ),
        tagInput: (
            <TagInput data={data} setData={setData} />
        ),
        mstoggleInput: (
            <MultiToggleInput data={data} setData={setData} />
        ),
        toggleInput: (
            <ToggleInput data={data} setData={setData} />
        )
    }

    return (
        <div className="w-full">
            {inputComponents[data.inputType] || null}
        </div>
    )
}
