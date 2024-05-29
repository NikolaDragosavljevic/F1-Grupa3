export function getFlagCode (flags, value) {
  
    const flag = flags.filter(item => ((item.nationality === value) || (item.en_short_name === value)));
    if (flag.length) {
        return flag[0].alpha_2_code;
    } else {
        if (value === "Afghan") {
            return "AF";
        } 
    }
}

