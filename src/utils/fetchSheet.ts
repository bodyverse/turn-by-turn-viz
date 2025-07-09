const API_KEY = 'AIzaSyDDD7b_b59LnN-wE918DZhkaPjFrfU0iIA';
const SHEET_ID = '1jcMkqlsW-473hbBxw4pRYFfxA2J5QIhcM6LK4wrP2Qw';

export async function fetchSheet<T>(sheetName: string): Promise<T[]> {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${sheetName}?key=${API_KEY}`;
    const res = await fetch(url);
    const json = await res.json();

    const [header, ...rows] = json.values as string[][];

    return rows.map((row) =>
        Object.fromEntries(
            header.map((key, i) => [key, row[i]] as [string, any])
        ) as T
    );
}