/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jsHelix from "../index";
import * as helix from "../types/helix";

const TWITCH_CLIENT = process.env.TWITCH_CLIENT || "";
const TWITCH_TOKEN = process.env.TWITCH_TOKEN || "";

let TWITCH_USER: helix.User;

describe("index", () => {
  beforeAll(async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    TWITCH_USER = (await hapi.getUsers()).data![0];
  });

  it("Calls jsHelix with clientId and token", () => {
    const hapi = jsHelix("clientId", "token");
    expect(hapi.url).toEqual("https://api.twitch.tv");
    expect(hapi.headers).toEqual({
      "Client-ID": "clientId",
      "Content-Type": "application/json",
      Authorization: "Bearer token",
    });
  });

  it("Calls jsHelix with only clientId", () => {
    const hapi = jsHelix("clientId");
    expect(hapi.url).toEqual("https://api.twitch.tv");
    expect(hapi.headers).toEqual({
      "Client-ID": "clientId",
      "Content-Type": "application/json",
    });
  });

  it("Calls startCommercial with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.startCommercial({
        broadcaster_id: TWITCH_USER.id,
        length: 30,
      });
      expect(result.data).toBeDefined();
      result.data!.forEach((ad) => {
        expect(ad.length).toBeDefined();
        expect(ad.message).toBeDefined();
        expect(ad.retryAfter).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual(
        `the channel '${TWITCH_USER.login}' is not currently live and needs to be in order to start commercials.`,
      );
    }
  });

  it("Calls getExtensionAnalytics with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.getExtensionAnalytics();
      expect(result.data).toBeDefined();
      result.data!.forEach((extension) => {
        expect(extension.URL).toBeDefined();
        expect(extension.date_range).toBeDefined();
        expect(extension.extension_id).toBeDefined();
        expect(extension.type).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("Report Not Found");
    }
  });

  it("Calls getCheermotes with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.getCheermotes();
    expect(result.data).toBeDefined();
    result.data!.forEach((cheermote) => {
      expect(cheermote.is_charitable).toBeDefined();
      expect(cheermote.last_updated).toBeDefined();
      expect(cheermote.order).toBeDefined();
      expect(cheermote.prefix).toBeDefined();
      expect(cheermote.tiers).toBeDefined();
      expect(cheermote.type).toBeDefined();
    });
  });

  it("Calls getBitsLeaderboard with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.getBitsLeaderboard();
    expect(result.data).toBeDefined();
    expect(result.date_range).toBeDefined();
    expect(result.total).toBeDefined();
    result.data!.forEach((leaderboard) => {
      expect(leaderboard.rank).toBeDefined();
      expect(leaderboard.score).toBeDefined();
      expect(leaderboard.user_id).toBeDefined();
      expect(leaderboard.user_name).toBeDefined();
    });
  });

  it("Calls getGameAnalytics with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.getGameAnalytics();
      expect(result.data).toBeDefined();
      result.data!.forEach((games) => {
        expect(games.URL).toBeDefined();
        expect(games.date_range).toBeDefined();
        expect(games.game_id).toBeDefined();
        expect(games.type).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("User Has No Access To Any Games");
    }
  });

  it("Calls getExtensionsTransactions with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.getExtensionsTransactions({
        extension_id: "extension_id",
      });
      expect(result.data).toBeDefined();
      result.data!.forEach((transaction) => {
        expect(transaction.broadcaster_id).toBeDefined();
        expect(transaction.broadcaster_name).toBeDefined();
        expect(transaction.id).toBeDefined();
        expect(transaction.product_data).toBeDefined();
        expect(transaction.product_data.cost).toBeDefined();
        expect(transaction.product_data.cost.amount).toBeDefined();
        expect(transaction.product_data.cost.type).toBeDefined();
        expect(transaction.product_data.displayName).toBeDefined();
        expect(transaction.product_data.inDevelopment).toBeDefined();
        expect(transaction.product_data.sku).toBeDefined();
        expect(transaction.product_type).toBeDefined();
        expect(transaction.timestamp).toBeDefined();
        expect(transaction.user_id).toBeDefined();
        expect(transaction.user_name).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("must provide valid app access token");
    }
  });

  it("Calls createCustomReward with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.createCustomReward(
        {
          broadcaster_id: TWITCH_USER.id,
        },
        { title: "reward_title", cost: 100000 },
      );
      expect(result.data).toBeDefined();
      result.data!.forEach((reward) => {
        expect(reward.background_color).toBeDefined();
        expect(reward.broadcaster_id).toBeDefined();
        expect(reward.broadcaster_name).toBeDefined();
        expect(reward.cooldown_expires_at).toBeDefined();
        expect(reward.cost).toBeDefined();
        expect(reward.default_image).toBeDefined();
        expect(reward.default_image.url_1x).toBeDefined();
        expect(reward.default_image.url_2x).toBeDefined();
        expect(reward.default_image.url_4x).toBeDefined();
        expect(reward.global_cooldown_setting).toBeDefined();
        expect(
          reward.global_cooldown_setting.global_cooldown_seconds,
        ).toBeDefined();
        expect(reward.global_cooldown_setting.is_enabled).toBeDefined();
        expect(reward.id).toBeDefined();
        expect(reward.image.url_1x).toBeDefined();
        expect(reward.image.url_2x).toBeDefined();
        expect(reward.image.url_4x).toBeDefined();
        expect(reward.is_enabled).toBeDefined();
        expect(reward.is_in_stock).toBeDefined();
        expect(reward.is_paused).toBeDefined();
        expect(reward.is_user_input_required).toBeDefined();
        expect(reward.max_per_stream_setting).toBeDefined();
        expect(reward.max_per_stream_setting.is_enabled).toBeDefined();
        expect(reward.max_per_stream_setting.max_per_stream).toBeDefined();
        expect(reward.max_per_user_per_stream_setting).toBeDefined();
        expect(reward.max_per_user_per_stream_setting.is_enabled).toBeDefined();
        expect(
          reward.max_per_user_per_stream_setting.max_per_user_per_stream,
        ).toBeDefined();
        expect(reward.prompt).toBeDefined();
        expect(reward.redemptions_redeemed_current_stream).toBeDefined();
        expect(reward.should_redemptions_skip_request_queue).toBeDefined();
        expect(reward.title).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual(
        "channel points are not available for the broadcaster",
      );
    }
  });

  it("Calls deleteCustomReward with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.deleteCustomReward({
        broadcaster_id: TWITCH_USER.id,
        id: "reward_id",
      });
      expect(result.status).toEqual(204);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("requested id was not found");
    }
  });

  it("Calls getCustomRewards with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.getCustomRewards({
        broadcaster_id: TWITCH_USER.id,
        id: ["reward_id", "reward_id2"],
        only_manageable_rewards: true,
      });
      expect(result.data).toBeDefined();
      result.data!.forEach((reward) => {
        expect(reward.background_color).toBeDefined();
        expect(reward.broadcaster_id).toBeDefined();
        expect(reward.broadcaster_name).toBeDefined();
        expect(reward.cooldown_expires_at).toBeDefined();
        expect(reward.cost).toBeDefined();
        expect(reward.default_image).toBeDefined();
        expect(reward.default_image.url_1x).toBeDefined();
        expect(reward.default_image.url_2x).toBeDefined();
        expect(reward.default_image.url_4x).toBeDefined();
        expect(reward.global_cooldown_setting).toBeDefined();
        expect(
          reward.global_cooldown_setting.global_cooldown_seconds,
        ).toBeDefined();
        expect(reward.global_cooldown_setting.is_enabled).toBeDefined();
        expect(reward.id).toBeDefined();
        expect(reward.image.url_1x).toBeDefined();
        expect(reward.image.url_2x).toBeDefined();
        expect(reward.image.url_4x).toBeDefined();
        expect(reward.is_enabled).toBeDefined();
        expect(reward.is_in_stock).toBeDefined();
        expect(reward.is_paused).toBeDefined();
        expect(reward.is_user_input_required).toBeDefined();
        expect(reward.max_per_stream_setting).toBeDefined();
        expect(reward.max_per_stream_setting.is_enabled).toBeDefined();
        expect(reward.max_per_stream_setting.max_per_stream).toBeDefined();
        expect(reward.max_per_user_per_stream_setting).toBeDefined();
        expect(reward.max_per_user_per_stream_setting.is_enabled).toBeDefined();
        expect(
          reward.max_per_user_per_stream_setting.max_per_user_per_stream,
        ).toBeDefined();
        expect(reward.prompt).toBeDefined();
        expect(reward.redemptions_redeemed_current_stream).toBeDefined();
        expect(reward.should_redemptions_skip_request_queue).toBeDefined();
        expect(reward.title).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual(
        "channel points are not available for the broadcaster",
      );
    }
  });

  it("Calls getCustomRewardRedemption with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.getCustomRewardRedemption({
        broadcaster_id: TWITCH_USER.id,
        reward_id: "reward_id",
      });
      expect(result.data).toBeDefined();
      result.data!.forEach((reward) => {
        expect(reward.broadcaster_id).toBeDefined();
        expect(reward.broadcaster_name).toBeDefined();
        expect(reward.id).toBeDefined();
        expect(reward.redeemed_at).toBeDefined();
        expect(reward.reward).toBeDefined();
        expect(reward.reward.cost).toBeDefined();
        expect(reward.reward.id).toBeDefined();
        expect(reward.reward.prompt).toBeDefined();
        expect(reward.reward.title).toBeDefined();
        expect(reward.status).toBeDefined();
        expect(reward.user_id).toBeDefined();
        expect(reward.user_input).toBeDefined();
        expect(reward.user_name).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("missing redemption status");
    }
  });

  it("Calls updateCustomReward with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.updateCustomReward(
        {
          broadcaster_id: TWITCH_USER.id,
          id: "reward_id",
        },
        { title: "reward_title" },
      );
      expect(result.data).toBeDefined();
      result.data!.forEach((reward) => {
        expect(reward.background_color).toBeDefined();
        expect(reward.broadcaster_id).toBeDefined();
        expect(reward.broadcaster_name).toBeDefined();
        expect(reward.cooldown_expires_at).toBeDefined();
        expect(reward.cost).toBeDefined();
        expect(reward.default_image).toBeDefined();
        expect(reward.default_image.url_1x).toBeDefined();
        expect(reward.default_image.url_2x).toBeDefined();
        expect(reward.default_image.url_4x).toBeDefined();
        expect(reward.global_cooldown_setting).toBeDefined();
        expect(
          reward.global_cooldown_setting.global_cooldown_seconds,
        ).toBeDefined();
        expect(reward.global_cooldown_setting.is_enabled).toBeDefined();
        expect(reward.id).toBeDefined();
        expect(reward.image.url_1x).toBeDefined();
        expect(reward.image.url_2x).toBeDefined();
        expect(reward.image.url_4x).toBeDefined();
        expect(reward.is_enabled).toBeDefined();
        expect(reward.is_in_stock).toBeDefined();
        expect(reward.is_paused).toBeDefined();
        expect(reward.is_user_input_required).toBeDefined();
        expect(reward.max_per_stream_setting).toBeDefined();
        expect(reward.max_per_stream_setting.is_enabled).toBeDefined();
        expect(reward.max_per_stream_setting.max_per_stream).toBeDefined();
        expect(reward.max_per_user_per_stream_setting).toBeDefined();
        expect(reward.max_per_user_per_stream_setting.is_enabled).toBeDefined();
        expect(
          reward.max_per_user_per_stream_setting.max_per_user_per_stream,
        ).toBeDefined();
        expect(reward.prompt).toBeDefined();
        expect(reward.redemptions_redeemed_current_stream).toBeDefined();
        expect(reward.should_redemptions_skip_request_queue).toBeDefined();
        expect(reward.title).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("requested id was not found");
    }
  });

  it("Calls updateCustomRewardRedemptionStatus with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.updateCustomRewardRedemptionStatus(
        {
          broadcaster_id: TWITCH_USER.id,
          reward_id: "reward_id",
          id: ["redemption_id1", "redemption_id2"],
        },
        { status: "CANCELED" },
      );
      expect(result.data).toBeDefined();
      result.data!.forEach((reward) => {
        expect(reward.broadcaster_id).toBeDefined();
        expect(reward.broadcaster_name).toBeDefined();
        expect(reward.id).toBeDefined();
        expect(reward.redeemed_at).toBeDefined();
        expect(reward.reward).toBeDefined();
        expect(reward.reward.cost).toBeDefined();
        expect(reward.reward.id).toBeDefined();
        expect(reward.reward.prompt).toBeDefined();
        expect(reward.reward.title).toBeDefined();
        expect(reward.status).toBeDefined();
        expect(reward.user_id).toBeDefined();
        expect(reward.user_input).toBeDefined();
        expect(reward.user_name).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("requested id was not found");
    }
  });

  it("Calls createClip with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.createClip({
        broadcaster_id: TWITCH_USER.id,
      });
      expect(result.data).toBeDefined();
      result.data!.forEach((clip) => {
        expect(clip.id).toBeDefined();
        expect(clip.edit_url).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual(
        "Clipping is not possible for an offline channel.",
      );
    }
  });

  it("Calls getClips with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.getClips({
      broadcaster_id: TWITCH_USER.id,
    });
    expect(result.data).toBeDefined();
    result.data!.forEach((clip) => {
      expect(clip.broadcaster_id).toBeDefined();
      expect(clip.broadcaster_name).toBeDefined();
      expect(clip.created_at).toBeDefined();
      expect(clip.creator_id).toBeDefined();
      expect(clip.creator_name).toBeDefined();
      expect(clip.embed_url).toBeDefined();
      expect(clip.embed_url).toBeDefined();
      expect(clip.game_id).toBeDefined();
      expect(clip.id).toBeDefined();
      expect(clip.language).toBeDefined();
      expect(clip.thumbnail_url).toBeDefined();
      expect(clip.title).toBeDefined();
      expect(clip.url).toBeDefined();
      expect(clip.video_id).toBeDefined();
      expect(clip.view_count).toBeDefined();
    });
  });

  it("Calls createEntitlementGrantsUploadURL with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.createEntitlementGrantsUploadURL({
        manifest_id: "manifest_id",
        type: "bulk_drops_grant",
      });
      expect(result.data).toBeDefined();
      result.data!.forEach((grant) => {
        expect(grant.url).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("Must provide valid app token.");
    }
  });

  it("Calls getCodeStatus with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.getCodeStatus({
        user_id: TWITCH_USER.id,
        code: "code",
      });
      expect(result.data).toBeDefined();
      result.data!.forEach((code) => {
        expect(code.code).toBeDefined();
        expect(code.status).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("invalid auth method");
    }
  });

  it("Calls redeemCode with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.redeemCode({
        user_id: TWITCH_USER.id,
        code: "code",
      });
      expect(result.data).toBeDefined();
      result.data!.forEach((code) => {
        expect(code.code).toBeDefined();
        expect(code.status).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("");
    }
  });

  it("Calls getTopGames with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.getTopGames();
    expect(result.data).toBeDefined();
    result.data!.forEach((game) => {
      expect(game.box_art_url).toBeDefined();
      expect(game.id).toBeDefined();
      expect(game.name).toBeDefined();
    });
  });

  it("Calls getGames with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.getGames({ name: ["Fortnite", "Call of Duty"] });
    expect(result.data).toBeDefined();
    result.data!.forEach((game) => {
      expect(game.box_art_url).toBeDefined();
      expect(game.id).toBeDefined();
      expect(game.name).toBeDefined();
    });
  });

  it("Calls checkAutoModStatus with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.checkAutoModStatus(
        {
          broadcaster_id: TWITCH_USER.id,
        },
        {
          data: [
            {
              msg_id: "msg_id",
              msg_text: "msg_text",
              user_id: "user_id",
            },
          ],
        },
      );
      expect(result.data).toBeDefined();
      result.data!.forEach((msg) => {
        expect(msg.is_permitted).toBeDefined();
        expect(msg.msg_id).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("");
    }
  });

  it("Calls getBannedUsers with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.getBannedUsers({
      broadcaster_id: TWITCH_USER.id,
    });
    expect(result.data).toBeDefined();
    result.data!.forEach((ban) => {
      expect(ban.expires_at).toBeDefined();
      expect(ban.user_id).toBeDefined();
      expect(ban.user_name).toBeDefined();
    });
  });

  it("Calls getBannedEvents with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.getBannedEvents({
      broadcaster_id: TWITCH_USER.id,
    });
    expect(result.data).toBeDefined();
    result.data!.forEach((ban) => {
      expect(ban.event_data).toBeDefined();
      expect(ban.event_data.broadcaster_id).toBeDefined();
      expect(ban.event_data.broadcaster_name).toBeDefined();
      expect(ban.event_data.expires_at).toBeDefined();
      expect(ban.event_data.user_id).toBeDefined();
      expect(ban.event_data.user_name).toBeDefined();
      expect(ban.event_timestamp).toBeDefined();
      expect(ban.event_type).toBeDefined();
      expect(ban.id).toBeDefined();
      expect(ban.version).toBeDefined();
    });
  });

  it("Calls getModerators with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.getModerators({
      broadcaster_id: TWITCH_USER.id,
    });
    expect(result.data).toBeDefined();
    result.data!.forEach((mod) => {
      expect(mod.user_id).toBeDefined();
      expect(mod.user_name).toBeDefined();
    });
  });

  it("Calls getModeratorEvents with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.getModeratorEvents({
      broadcaster_id: TWITCH_USER.id,
    });
    expect(result.data).toBeDefined();
    result.data!.forEach((mod) => {
      expect(mod.event_data).toBeDefined();
      expect(mod.event_data.broadcaster_id).toBeDefined();
      expect(mod.event_data.broadcaster_name).toBeDefined();
      expect(mod.event_data.user_id).toBeDefined();
      expect(mod.event_data.user_name).toBeDefined();
      expect(mod.event_timestamp).toBeDefined();
      expect(mod.event_type).toBeDefined();
      expect(mod.id).toBeDefined();
      expect(mod.version).toBeDefined();
    });
  });

  it("Calls searchCategories with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.searchCategories({
      query: encodeURIComponent("Arts"),
    });
    expect(result.data).toBeDefined();
    result.data!.forEach((category) => {
      expect(category.id).toBeDefined();
      expect(category.box_art_url).toBeDefined();
      expect(category.name).toBeDefined();
    });
  });

  it("Calls searchChannels with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.searchChannels({
      query: encodeURIComponent(TWITCH_USER.display_name),
    });
    expect(result.data).toBeDefined();
    result.data!.forEach((channel) => {
      expect(channel.broadcaster_language).toBeDefined();
      expect(channel.display_name).toBeDefined();
      expect(channel.game_id).toBeDefined();
      expect(channel.id).toBeDefined();
      expect(channel.is_live).toBeDefined();
      expect(channel.thumbnail_url).toBeDefined();
      expect(channel.title).toBeDefined();
      if (channel.is_live) {
        expect(channel.started_at).toBeDefined();
        expect(channel.tags_ids).toBeDefined();
      }
    });
  });

  it("Calls getStreamKey with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.getStreamKey({
        broadcaster_id: TWITCH_USER.id,
      });
      expect(result.data).toBeDefined();
      result.data!.forEach((key) => {
        expect(key.stream_key).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("Missing scope: channel:read:stream_key");
    }
  });

  it("Calls getStreams with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.getStreams();
    expect(result.data).toBeDefined();
    result.data!.forEach((stream) => {
      expect(stream.game_id).toBeDefined();
      expect(stream.id).toBeDefined();
      expect(stream.language).toBeDefined();
      expect(stream.started_at).toBeDefined();
      expect(stream.thumbnail_url).toBeDefined();
      expect(stream.title).toBeDefined();
      expect(stream.type).toBeDefined();
      expect(stream.user_id).toBeDefined();
      expect(stream.user_name).toBeDefined();
      expect(stream.viewer_count).toBeDefined();
    });
  });

  it("Calls getStreamsMetadata with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.getStreamsMetadata();
      expect(result.data).toBeDefined();
      result.data!.forEach((stream) => {
        expect(stream.user_id).toBeDefined();
        expect(stream.user_name).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual(
        "Endpoint deprecated: https://discuss.dev.twitch.tv/t/deprecation-of-the-helix-get-streams-metadata-endpoint/26407",
      );
    }
  });

  it("Calls createStreamMarker with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.createStreamMarker({ user_id: TWITCH_USER.id });
      expect(result.data).toBeDefined();
      result.data!.forEach((marker) => {
        expect(marker.created_at).toBeDefined();
        expect(marker.description).toBeDefined();
        expect(marker.id).toBeDefined();
        expect(marker.position_seconds).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual(
        'code:"BROADCASTER_NOT_LIVE" message:"Stream markers cannot be created when the channel is offline." ',
      );
    }
  });

  it("Calls getStreamMarkers with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.getStreamMarkers({
        user_id: TWITCH_USER.id,
      });
      expect(result.data).toBeDefined();
      result.data!.forEach((stream) => {
        expect(stream.user_id).toBeDefined();
        expect(stream.user_name).toBeDefined();
        expect(stream.videos).toBeDefined();
        stream.videos.forEach((video) => {
          expect(video.markers).toBeDefined();
          expect(video.video_id).toBeDefined();
          video.markers.forEach((marker) => {
            expect(marker.URL).toBeDefined();
            expect(marker.created_at).toBeDefined();
            expect(marker.description).toBeDefined();
            expect(marker.id).toBeDefined();
            expect(marker.position_seconds).toBeDefined();
          });
        });
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual(
        "Unable to find user's most recent Video/VOD ID. Please ensure you are passing the correct user id!",
      );
    }
  });

  it("Calls getChannelInformation with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.getChannelInformation({
      broadcaster_id: TWITCH_USER.id,
    });
    expect(result.data).toBeDefined();
    result.data!.forEach((channel) => {
      expect(channel.broadcaster_id).toBeDefined();
      expect(channel.broadcaster_language).toBeDefined();
      expect(channel.game_id).toBeDefined();
      expect(channel.game_name).toBeDefined();
      expect(channel.title).toBeDefined();
    });
  });

  it("Calls modifyChannelInformation with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.modifyChannelInformation({
      broadcaster_id: TWITCH_USER.id,
      broadcaster_language: "en",
    });
    expect(result.status).toEqual(204);
  });

  it("Calls getBroadcasterSubscriptions with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.getBroadcasterSubscriptions({
      broadcaster_id: TWITCH_USER.id,
    });
    const tiers = [
      helix.SubscriptionTier["Tier 1"],
      helix.SubscriptionTier["Tier 2"],
      helix.SubscriptionTier["Tier 3"],
    ];
    const tierMatcher = new RegExp(`(${tiers.join("|")})`);
    expect(result.data).toBeDefined();
    result.data!.forEach((sub) => {
      expect(sub.broadcaster_id).toBeDefined();
      expect(sub.broadcaster_name).toBeDefined();
      expect(sub.is_gift).toBeDefined();
      expect(sub.plan_name).toBeDefined();
      expect(sub.tier).toMatch(tierMatcher);
      expect(sub.user_id).toBeDefined();
      expect(sub.user_name).toBeDefined();
    });
  });

  it("Calls getAllStreamTags with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.getAllStreamTags();
    expect(result.data).toBeDefined();
    result.data!.forEach((tag) => {
      expect(tag.is_auto).toBeDefined();
      expect(tag.localization_descriptions).toBeDefined();
      expect(tag.localization_names).toBeDefined();
      expect(tag.tag_id).toBeDefined();
    });
  });

  it("Calls getStreamTags with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.getStreamTags({
      broadcaster_id: TWITCH_USER.id,
    });
    expect(result.data).toBeDefined();
    result.data!.forEach((tag) => {
      expect(tag.is_auto).toBeDefined();
      expect(tag.localization_descriptions).toBeDefined();
      expect(tag.localization_names).toBeDefined();
      expect(tag.tag_id).toBeDefined();
    });
  });

  it("Calls replaceStreamTags with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.replaceStreamTags({
      broadcaster_id: TWITCH_USER.id,
    });
    expect(result.status).toEqual(204);
  });

  it("Calls createUserFollow with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.createUserFollow({
        from_id: TWITCH_USER.id,
        to_id: TWITCH_USER.id,
      });
      expect(result.status).toEqual(204);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("target_user_id can not be from_user_id");
    }
  });

  it("Calls deleteUserFollow with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.deleteUserFollow({
        from_id: TWITCH_USER.id,
        to_id: TWITCH_USER.id,
      });
      expect(result.status).toEqual(204);
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("target_user_id can not be from_user_id");
    }
  });

  it("Calls getUsers with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.getUsers();
    expect(result.data).toBeDefined();
    result.data!.forEach((user) => {
      expect(user.broadcaster_type).toBeDefined();
      expect(user.description).toBeDefined();
      expect(user.display_name).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.login).toBeDefined();
      expect(user.offline_image_url).toBeDefined();
      expect(user.profile_image_url).toBeDefined();
      expect(user.type).toBeDefined();
      expect(user.view_count).toBeDefined();
    });
  });

  it("Calls getUserFollows with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.getUserFollows({
      from_id: TWITCH_USER.id,
    });
    expect(result.data).toBeDefined();
    result.data!.forEach((follow) => {
      expect(follow.followed_at).toBeDefined();
      expect(follow.from_id).toBeDefined();
      expect(follow.from_name).toBeDefined();
      expect(follow.to_id).toBeDefined();
      expect(follow.to_name).toBeDefined();
    });
  });

  it("Calls updateUser with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.updateUser({
      description: TWITCH_USER.description,
    });
    expect(result.data).toBeDefined();
    result.data!.forEach((user) => {
      expect(user.broadcaster_type).toBeDefined();
      expect(user.description).toBeDefined();
      expect(user.display_name).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.login).toBeDefined();
      expect(user.offline_image_url).toBeDefined();
      expect(user.profile_image_url).toBeDefined();
      expect(user.type).toBeDefined();
      expect(user.view_count).toBeDefined();
    });
  });

  it("Calls getUserExtensions with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.getUserExtensions();
    expect(result.data).toBeDefined();
    result.data!.forEach((extension) => {
      expect(extension.can_activate).toBeDefined();
      expect(extension.id).toBeDefined();
      expect(extension.name).toBeDefined();
      expect(extension.type).toBeDefined();
      expect(extension.version).toBeDefined();
    });
  });

  it("Calls getUserActiveExtensions with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.getUserActiveExtensions();
    expect(result.data).toBeDefined();
    expect(result.data!.component).toBeDefined();
    expect(result.data!.overlay).toBeDefined();
    expect(result.data!.panel).toBeDefined();
    Object.values(result.data!).forEach(
      (extensionType: helix.map<helix.DetailedExtension>) => {
        Object.values(extensionType).forEach((extension) => {
          expect(extension.active).toBeDefined();
          if (extension.active) {
            expect(extension.id).toBeDefined();
            expect(extension.name).toBeDefined();
            expect(extension.version).toBeDefined();
          }
        });
      },
    );
  });

  it("Calls updateUserExtensions with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.updateUserExtensions({
      data: {
        panel: {},
        component: {},
        overlay: {},
      },
    });
    expect(result.data).toBeDefined();
    expect(result.data!.component).toBeDefined();
    expect(result.data!.overlay).toBeDefined();
    expect(result.data!.panel).toBeDefined();
    Object.values(result.data!).forEach(
      (extensionType: helix.map<helix.DetailedExtension>) => {
        Object.values(extensionType).forEach((extension) => {
          expect(extension.active).toBeDefined();
          if (extension.active) {
            expect(extension.id).toBeDefined();
            expect(extension.name).toBeDefined();
            expect(extension.version).toBeDefined();
          }
        });
      },
    );
  });

  it("Calls getVideos with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    const result = await hapi.getVideos({
      user_id: TWITCH_USER.id,
    });
    expect(result.data).toBeDefined();
    result.data!.forEach((video) => {
      expect(video.created_at).toBeDefined();
      expect(video.description).toBeDefined();
      expect(video.duration).toBeDefined();
      expect(video.id).toBeDefined();
      expect(video.language).toBeDefined();
      expect(video.published_at).toBeDefined();
      expect(video.thumbnail_url).toBeDefined();
      expect(video.title).toBeDefined();
      expect(video.type).toBeDefined();
      expect(video.url).toBeDefined();
      expect(video.user_id).toBeDefined();
      expect(video.user_name).toBeDefined();
      expect(video.view_count).toBeDefined();
      expect(video.viewable).toBeDefined();
    });
  });

  it("Calls getWebhookSubscriptions with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.getWebhookSubscriptions();
      expect(result.data).toBeDefined();
      result.data!.forEach((whsub) => {
        expect(whsub.callback).toBeDefined();
        expect(whsub.expires_at).toBeDefined();
        expect(whsub.topic).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("Must provide valid app token.");
    }
  });

  it("Calls getHypeTrainEvents with clientId and token", async () => {
    const hapi = jsHelix(TWITCH_CLIENT, TWITCH_TOKEN);
    try {
      const result = await hapi.getHypeTrainEvents({
        broadcaster_id: TWITCH_USER.id,
      });
      expect(result.data).toBeDefined();
      result.data!.forEach((hype) => {
        expect(hype.event_data).toBeDefined();
        expect(hype.event_data.broadcaster_id).toBeDefined();
        expect(hype.event_data.cooldown_end_time).toBeDefined();
        expect(hype.event_data.expires_at).toBeDefined();
        expect(hype.event_data.goal).toBeDefined();
        expect(hype.event_data.id).toBeDefined();
        expect(hype.event_data.last_contribution).toBeDefined();
        expect(hype.event_data.last_contribution.total).toBeDefined();
        expect(hype.event_data.last_contribution.type).toBeDefined();
        expect(hype.event_data.last_contribution.user).toBeDefined();
        expect(hype.event_data.level).toBeDefined();
        expect(hype.event_data.started_at).toBeDefined();
        expect(hype.event_data.top_contributions).toBeDefined();
        hype.event_data.top_contributions.forEach((contribution) => {
          expect(contribution.total).toBeDefined();
          expect(contribution.type).toBeDefined();
          expect(contribution.user).toBeDefined();
        });
        expect(hype.event_data.total).toBeDefined();
        expect(hype.event_timestamp).toBeDefined();
        expect(hype.event_type).toBeDefined();
        expect(hype.id).toBeDefined();
        expect(hype.version).toBeDefined();
      });
    } catch (result) {
      expect(result.error).toBeDefined();
      expect(result.message).toEqual("Missing scope: channel:read:hype_train");
    }
  });
});
