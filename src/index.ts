import { FileSaver } from "./Helpers/FileSaver";
import { GetPhotoService } from "./Service/GetPhotoService";
import minimist from 'minimist';
import { format } from 'date-fns';

type MyArgs = minimist.ParsedArgs & {
    name: string;
    offset: number;
    count: number;
}

async function main() {
    const args: MyArgs = minimist<MyArgs>(process.argv.slice(2), {
        default: {
            name: format(new Date(), 'dd.MM.yyyy(HH.mm.ss)'),
            offset: 381000,
            count: 25
        }
    });

    const result = await new GetPhotoService();
    const saver = new FileSaver();
    await saver.createDir(args.name);
    for (let i = 0; i < args.count; i++) {
        const response = await result.get((args.offset + i).toString());
        if (response.status === 200) {
            
            await saver.saveFile(new Date().getTime().toString() + '.jpg', response.data);
        }
    }
}

main();