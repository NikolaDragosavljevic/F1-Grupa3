export function getFlagCode(flags, value) {

    const flag = flags.filter(item => ((item.nationality === value) || (item.en_short_name === value)));
    if (flag.length) {
        return flag[0].alpha_2_code;
    } else {
        if ((value === "British") || (value === "UK")) {
            return "GB";
        } else if (value === "Korea") {
            return "KR";
        } else if (value === "UAE") {
            return "AE";
        } else if (value === "Dutch") {
            return "NL";
        } else if (value === "Russia") {
            return "RU";
        } else if (value === "New Zealander") {
            return "NZ";
        } else if (value === "Monegasque") {
            return "MC";
        } else if ((value === "American") || (value === "USA") || (value === "United States")) {
            return "US";
        } else return "RS";
    };
}

export function getAllYears() {
    let yearsList = [];
    for (let i = 2013; i < 2024; i++) {
        yearsList.push(i);
    };
    return yearsList;
};


export function getCellColorCoded (value) {
    if (value == 1) return 'linear-gradient(#fef6a4, #fff9c0)'
    else if (value == 2) return 'linear-gradient(#e7eaed, #eef2f6)'
    else if (value == 3) return 'linear-gradient(to bottom right, #fab36c 20%, #f9e2cc 86%)'
    else if (value == 4) return 'linear-gradient(to bottom right, #e0ffff 20%, #f1fcfc 86%)'
    else if (value == 5) return 'linear-gradient(to bottom right, #edffff 0%, #f4fcfc 100%)'
    else if (value == 6) return 'linear-gradient(to bottom right, #f1fcfc 0%, #f6fcfc 100%)'
    else if (value == 7) return 'linear-gradient(to bottom right, #e6e6fa 20%, #f1f1fc 86%)'
    else if (value == 8) return 'linear-gradient(to bottom right, #fce7ee 20%, #fff0f5 86%)'
    else if (value == 9) return 'linear-gradient(to bottom right, #fbf1c9 20%, #fff8dc 86%)'
    else if (value == 10) return 'linear-gradient(to bottom right, #f0ffff 20%, #e1fcfc 86%)'
    else return 'linear-gradient(to bottom right, #fcfce9 0%, #ffffff 100%)';
};



