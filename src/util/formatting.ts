import { DateTime  } from 'luxon'

export const shortDate = (date: DateTime): string => {
    return date.toFormat("dd.mm.yyyy")
}

export const longDateTime = (date: DateTime): string => {
    return date.toFormat("dd.mm.yyyy hh:mm")
}