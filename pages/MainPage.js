import CommonActions from "../common_actions/common_actions";

export default class MainPage {
    constructor(page) {
        this.page = page;
        this.commonActions = new CommonActions(page);
        this.url = 'https://www.mugna.tech/';
    }

    async navigate(url = this.url) { 
        await this.commonActions.navigate(url);
    }

    async scroll_to_contact(page){
        await page.getByRole('link', { name: 'Contact Us' }).click();
    }


}