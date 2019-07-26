import { DateTime  } from 'luxon'

export const shortDate = (date: DateTime): string => {
    return date.toFormat("dd.MM.yyyy")
}

export const longDateTime = (date: DateTime): string => {
    return date.toFormat("dd.MM.yyyy hh:mm")
}