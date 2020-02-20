

export const dateToString = (date, time= null) => {
	if(date && date !== '')
    	return new Date(date).toDateString() +' '+ (time ? new Date(date).toLocaleTimeString('id') : '')
   	return '';
}

export const textLimit = (string) => {
	if(string) return string.length > 50 ? string.substring(0,50)+'...' : string;
	return '';	
}
