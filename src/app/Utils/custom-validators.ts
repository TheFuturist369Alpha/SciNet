import { FormControl, ValidationErrors } from "@angular/forms";

export class CustomValidotors {

    public static checkOnlyWhitespace(control:FormControl):ValidationErrors{
        if((control.value!=null) && (control.value.trim()==="" ) && (control.value!=""))
        {
            return {"OnlyWhitespace":true};
        }
        else{
            return {};
        }
    }

    
}
