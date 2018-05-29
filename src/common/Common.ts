export function parseJson<T>(str:string):T|any
{
    try {
        return JSON.parse(str);
    }
    catch(e)
    {
        return null;
    }

}