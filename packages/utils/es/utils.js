// 全大写命名
export function toCapitalCase(value) {
    return (value.charAt(0).toUpperCase() +
        value.slice(1).replace(/-([a-z])/g, (_, char) => (char ? char.toUpperCase() : '')));
}
