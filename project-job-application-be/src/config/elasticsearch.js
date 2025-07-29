import { Client } from '@elastic/elasticsearch'
import { env } from './environment'
export const elasticClient = new Client({
    node: 'https://a4c3b5e6f7404d449cdffd2b1dc72b4b.us-central1.gcp.cloud.es.io:443',
    auth: {
        apiKey: env.ELASTICSEARCH_API_KEY
    }
})


