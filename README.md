"# Ask Out to Be My Valentine 💝

A mobile-responsive Next.js website to create personalized Valentine's Day proposal links.

## How It Works

1. **Root page (`/`)**: Select your partner's profession (Doctor / Electronic Engineer), then Boy or Girl, enter their name, and generate a unique link.
2. **Partner page**: When they open the link, they see their personalized page with an image, "Will you be my Valentine?" and Yes/No buttons.
3. **No button**: Moves away when clicked (evasive) with a sad message—encouraging them to say yes!
4. **Yes button**: Shows a celebration with "I knew it! Love you!!!!" and a fun GIF.

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Link Format

```
/{category}/{gender}?name=PartnerName
```

Example: `/electronic-engineer/girl?name=Sarah`

## Adding More Images

Place images in `public/sources/{category}/{gender}/` and update `lib/config.ts` IMAGE_MAP." 
