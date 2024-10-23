import slugify from 'slugify';

export function slugGenerator(title: string): string {
    return slugify(title, { lower: true, strict: true });
}
