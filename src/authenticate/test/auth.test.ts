import { Auth } from './../auth'

window.location.assign = jest.fn().mockImplementation((url: string): string => url);

test('Should change location to a valid OAuth endpoint on login', () => {
    let url = Auth.login();

    expect(url).toContain("client_id")
    expect(url).toContain("state")
    expect(url).toContain("scope")
    expect(url).toContain("redirect_uri")
    expect(url).toContain("response_type")
})

//Util
function storageMock() {
    var storage: any = {};

    return {
        setItem: function(key: string, value: any) {
            storage[key] = value || '';
        },
        getItem: function(key: string) {
            return key in storage ? storage[key] : null;
        },
        removeItem: function(key: string) {
            delete storage[key];
        },
        get length(): number {
            return Object.keys(storage).length;
        },
        key: function(i: number) {
            var keys = Object.keys(storage);
            return keys[i] || null;
        }
    };
}