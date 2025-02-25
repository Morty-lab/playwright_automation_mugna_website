


export default class CommonActions {
    constructor(page) {
        this.page = page
    }
    async navigate(url) {
        // await this.page.pause();
        await this.page.goto(url);
    }

    async click(selector) {
        await this.page.click(selector);
    }

    async type(selector, text) {
        await this.page.type(selector, text);
    }

    async fill(selector, text) {    
        await this.page.fill(selector, text);
    }

    async getText(selector) {
        return await this.page.textContent(selector);
    }

    async getAttribute(selector, attribute) {
        return await this.page.getAttribute(selector, attribute);
    }


}