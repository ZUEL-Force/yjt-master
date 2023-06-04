import * as Moment from 'moment'


export function DateToString(date){
    return Moment(date).format('YYYY-M-DD  HH:mm')
}
