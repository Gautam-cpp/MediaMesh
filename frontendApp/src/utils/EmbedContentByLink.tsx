import { StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

export const EmbedContentByLink = (link: string) => {
    if(link.includes("youtube.com") || link.includes("youtu.be")) {
        const videoId = link.split(/(?:v=|\/)([0-9A-Za-z_-]{11})/)[1];
        return (
            <WebView
                  source={{ uri: `https://youtube.com/embed/${videoId}` }}
                  style={styles.webView}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  startInLoadingState={true}
                  scalesPageToFit={true}
                  mediaPlaybackRequiresUserAction={false}
                  allowsInlineMediaPlayback={true}
                  allowsFullscreenVideo={true}
            />
        )
    }

    if(link.includes("reddit.com")) {
        const redditEmbedUrl = extractRedditEmbedUrl(link);
        if (!redditEmbedUrl) return null;
        
        return (
            <WebView
                source={{ uri: redditEmbedUrl }}
                style={styles.webView}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={true}
                mediaPlaybackRequiresUserAction={false}
                allowsInlineMediaPlaybook={true}
            />
        );
    }

    if(link.includes("linkedin.com")) {

        return (
            <WebView
                source={{ uri: link }}
                style={styles.webView}
                javaScriptEnabled={true}
                domStorageEnabled={true}    
                startInLoadingState={true}
                scalesPageToFit={true}
                mediaPlaybackRequiresUserAction={false}
                allowsInlineMediaPlayback={true}
                allowsFullscreenVideo={true}
               
            />
        )
    }

    if(link.includes("x.com")) {
        const tweetId = link.split("/status/")[1];
        return (
            <WebView
                source={{ uri: `https://platform.twitter.com/widgets/tweetbutton.html?text=${tweetId}` }}
                style={styles.webView}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={true}
                mediaPlaybackRequiresUserAction={false}
                allowsInlineMediaPlayback={true}
            />
        )
    }

    else{
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No preview Available</Text>
            </View>
        );
    }

    
    
    


}



const extractRedditEmbedUrl = (url: string): string | null => {
    try {
        const redditMatch = url.match(
            /(?:https?:\/\/)?(?:www\.)?reddit\.com\/r\/([^\/]+)\/comments\/([^\/]+)\/?/
        );
        if (redditMatch) {
            const subreddit = redditMatch[1];
            const postId = redditMatch[2];
            return `https://www.redditmedia.com/r/${subreddit}/comments/${postId}?ref_source=embed&ref=share&embed=true&theme=dark`;
        }
        return null;
    } catch {
        return null;
    }
};



const styles = StyleSheet.create({
    webView: {
        flex: 1,
      },
})