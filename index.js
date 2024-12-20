const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

app.post('/metadata', async (req, res) => {
    try {
        const { name, symbol, description, image } = req.body;

        if (!name || !symbol || !description || !image) {
            return res.status(400).json({
                error: 'Missing required fields. Please provide name, symbol, description, and image.'
            });
        }

        const metadata = {
            name,
            symbol,
            description,
            image,
        };

        await fs.writeFile(
            path.join(__dirname, 'metadata.json'),
            JSON.stringify(metadata, null, 2),
            'utf8'
        );

        res.status(201).json({ metadata });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});